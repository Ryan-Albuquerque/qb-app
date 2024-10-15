'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type FormValues = {
  document: string; // CPF
  password: string; // Password
};

// CPF validation pattern for Brazilian document number (only numbers)
const cpfPattern = /^\d{11}$/; // Only 11 digits

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  // Function that runs on form submit
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Logging in with:', data);
    // Proceed with login logic, such as an API call
    router.push('/qb')
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <Card className="max-w-md w-full bg-white p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Document (CPF) Input */}
          <div className="mb-4">
            <label htmlFor="document" className="block text-sm font-medium text-gray-700 mb-2">
              CPF (Document)
            </label>
            <input
              type="text"
              id="document"
              maxLength={11} // Only 11 digits allowed
              {...register('document', {
                required: 'CPF is required',
                pattern: { value: cpfPattern, message: 'Invalid CPF format. Use 11 digits.' },
              })}
              className={`w-full px-4 py-2 border ${errors.document ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="Enter your CPF"
            />
            {errors.document && <p className="text-red-500 text-sm mt-2">{errors.document.message}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters long' },
              })}
              className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white w-full py-2 rounded-md">
            Login
          </Button>
        </form>

        {/* Additional Links */}
        <div className="mt-4 flex justify-between items-center">
          <Link href="/auth/forgot-password" className="text-sm text-blue-500 hover:underline">
            Esqueci minha senha
          </Link>
          <Link href="/auth/register">
            <Button className="bg-green-500 hover:bg-green-700 text-white py-2 rounded-md">
              Criar conta nova
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
