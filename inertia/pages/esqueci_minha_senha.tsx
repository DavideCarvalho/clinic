/**
 * v0 by Vercel.
 * @see https://v0.dev/t/GtmalIstwqe
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from '@/components/ui/label'
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
import { Link } from '@inertiajs/react'

const schema = z.object({
  email: z.string().email(),
})

export default function Component() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  function onSubmit(data: z.infer<typeof schema>) {
    console.log(data)
  }

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
            <Button type="submit" className="w-full">
              Esqueci minha senha
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              <Link href="/login" className="underline underline-offset-4">
                Lembrou da sua senha? Entre aqui!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Form>
  )
}
