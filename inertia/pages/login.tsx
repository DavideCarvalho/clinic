/**
 * v0 by Vercel.
 * @see https://v0.dev/t/GtmalIstwqe
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/lib/components/ui/form'
import { useRef } from 'react'
import { Link } from '@inertiajs/react'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export default function Component() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const hiddenFormElement = useRef<HTMLFormElement>(null)

  function onSubmit() {
    if (!hiddenFormElement.current) return
    hiddenFormElement.current.submit()
  }

  const email = form.watch('email')
  const password = form.watch('password')

  return (
    <Form {...form}>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-sky-300 to-white">
        <div className="mx-4 w-full max-w-md rounded-lg bg-background p-8 shadow-2xl sm:mx-0">
          <div className="mb-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold">Bem vindo a CliniCare</h1>
          </div>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="meu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              <Link
                href={`/esqueci-minha-senha${email ? `?email=${email}` : ''}`}
                className="underline underline-offset-4"
              >
                Esqueceu sua senha?
              </Link>
            </div>
          </form>
          <form ref={hiddenFormElement} action="/api/login" method="post">
            <input type="hidden" name="email" placeholder="Email" value={email} />
            <input type="hidden" name="password" placeholder="Senha" value={password} />
          </form>
        </div>
      </div>
    </Form>
  )
}
