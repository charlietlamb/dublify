'use client'

import * as React from 'react'
import { useForm } from '@tanstack/react-form'
import * as z from 'zod'
import { cn } from '@ff/design-system/lib/utils'
import { Button } from '@ff/design-system/components/ui/button'
import Spinner from '../../misc/spinner'
import { UserCheck } from 'lucide-react'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { authClient } from '@ff/design-system/lib/authClient'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useSetAtom } from 'jotai'
import { userAtom } from '@ff/design-system/atoms/user/user-atom'
import PasswordStrength from './password-strength'
import Name from './name'
import Email from './email'
import OAuth from '../oauth/oauth'
import OrLabel from './or-label'
import { User } from '@ff/database'

export const userAuthSignupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
})

export type SignUpFormData = z.infer<typeof userAuthSignupSchema>

export default function AuthFormSignup({ className }: { className?: string }) {
  const router = useRouter()
  const setUser = useSetAtom(userAtom)
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    } as SignUpFormData,
    onSubmit: async ({ value }) => {
      const { name, email, password } = value
      setIsLoading(true)
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        imageUploaded: false,
        plan: 'free',
      })
      console.log(data)
      if (error) {
        toast.error('Something went wrong', {
          description: 'Make sure you email is correct and try again.',
        })
      } else {
        toast.success('Welcome!', {
          description: 'You have been signed up successfully',
          icon: <UserCheck />,
        })
        router.push('/dashboard')
      }
      router.push('/dashboard')
      setIsLoading(false)
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: userAuthSignupSchema,
    },
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  return (
    <div
      className={cn('flex flex-col gap-4 w-full max-w-2xl mx-auto', className)}
    >
      <form
        className={cn(
          'flex flex-col gap-2 w-full max-w-2xl mx-auto',
          className
        )}
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <Name form={form} />
        <Email form={form} />
        <PasswordStrength form={form} />
        <Button
          className="w-full"
          disabled={isLoading}
          variant="shine"
          colors="none"
        >
          {isLoading && <Spinner />}
          Sign Up
        </Button>
      </form>
      <OrLabel />
      <OAuth />
    </div>
  )
}
