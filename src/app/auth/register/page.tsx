'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

type FormValues = {
  document: string; // CPF
  name: string; // Name
  email: string; // Email
  phone: string; // Phone number
  password: string; // Password
  confirmPassword: string; // Confirm Password
};

// CPF validation pattern for Brazilian document number (only numbers)
const cpfPattern = /^\d{11}$/; // Only 11 digits

// Email validation pattern
const emailPattern = /^\S+@\S+\.\S+$/;

// Phone validation pattern (Brazilian format)
const phonePattern = /^\d{10,11}$/; // 10 or 11 digits

export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>();

  // Function that runs on form submit
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Registering with:', data);
    // Proceed with registration logic, such as an API call
    router.push('/plan/try-upgrade-plan');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <Card className="max-w-md w-full bg-white p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Document (CPF) Input */}
          <div className="mb-4">
            <label
              htmlFor="document"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              CPF (Document)
            </label>
            <input
              type="text"
              id="document"
              maxLength={11} // Only 11 digits allowed
              {...register('document', {
                required: 'CPF is required',
                pattern: {
                  value: cpfPattern,
                  message: 'Invalid CPF format. Use 11 digits.',
                },
              })}
              className={`w-full px-4 py-2 border ${
                errors.document ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="Enter your CPF"
            />
            {errors.document && (
              <p className="text-red-500 text-sm mt-2">
                {errors.document.message}
              </p>
            )}
          </div>

          {/* Name Input */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Name is required' })}
              className={`w-full px-4 py-2 border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: emailPattern,
                  message: 'Invalid email format',
                },
              })}
              className={`w-full px-4 py-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Input */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              maxLength={11} // Maximum length for Brazilian phone number
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: phonePattern,
                  message: 'Invalid phone format. Use 10 or 11 digits.',
                },
              })}
              className={`w-full px-4 py-2 border ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-2">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
              })}
              className={`w-full px-4 py-2 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => {
                  const { password } = getValues(); // Access password field value
                  return value === password || 'Passwords do not match';
                },
              })}
              className={`w-full px-4 py-2 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-2">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white w-full py-2 rounded-md"
          >
            Register
          </Button>
        </form>

        {/* Additional Links */}
        <div className="mt-4 text-center">
          <Link href="/auth/login" className="text-sm text-blue-500 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </Card>
    </div>
  );
}
