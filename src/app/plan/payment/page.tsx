// src/app/payment/page.tsx
'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type PaymentValues = {
  plan: string; // Added field for product plan
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
};

// Define plans using Record for better type safety
const plans: Record<string, number> = {
  monthly: 10,       // Price for Monthly Plan
  '3-months': 25,    // Price for 3 Months Plan
  '6-months': 45,    // Price for 6 Months Plan
  '1-year': 80,      // Price for 1 Year Plan
};

export default function Payment() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PaymentValues>();

  const [selectedPlanPrice, setSelectedPlanPrice] = useState<number>(0); // State for selected plan price

  const onSubmit: SubmitHandler<PaymentValues> = (data) => {
    console.log('Processing payment:', data);
    // Here you would handle the payment logic (e.g., API call)
  
    router.push('/qb')
  };

  // Watch the plan selection to update price dynamically
  const plan = watch('plan');

  // Update the price whenever the selected plan changes
  useEffect(() => {
    if (plan && plans[plan]) {
      setSelectedPlanPrice(plans[plan]);
    } else {
      setSelectedPlanPrice(0); // Reset price if no valid plan is selected
    }
  }, [plan]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <Card className="max-w-md w-full bg-white p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Payment Details</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Product Plan Selection */}
          <div className="mb-4">
            <label htmlFor="plan" className="block text-sm font-medium text-gray-700 mb-2">
              Select a Plan
            </label>
            <select
              id="plan"
              {...register('plan', { required: 'Please select a plan' })}
              className={`w-full px-4 py-2 border ${
                errors.plan ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
            >
              <option value="">--Select Plan--</option>
              <option value="monthly">Monthly Plan - $10</option>
              <option value="3-months">3 Months Plan - $25</option>
              <option value="6-months">6 Months Plan - $45</option>
              <option value="1-year">1 Year Plan - $80</option>
            </select>
            {errors.plan && <p className="text-red-500 text-sm mt-2">{errors.plan.message}</p>}
          </div>

          {/* Card Number Input */}
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              {...register('cardNumber', {
                required: 'Card number is required',
              })}
              className={`w-full px-4 py-2 border ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="Enter your card number"
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-2">{errors.cardNumber.message}</p>
            )}
          </div>

          {/* Card Holder Input */}
          <div className="mb-4">
            <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-2">
              Card Holder Name
            </label>
            <input
              type="text"
              id="cardHolder"
              {...register('cardHolder', {
                required: 'Card holder name is required',
              })}
              className={`w-full px-4 py-2 border ${
                errors.cardHolder ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="Enter card holder name"
            />
            {errors.cardHolder && (
              <p className="text-red-500 text-sm mt-2">{errors.cardHolder.message}</p>
            )}
          </div>

          {/* Expiry Date Input */}
          <div className="mb-4">
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date (MM/YY)
            </label>
            <input
              type="text"
              id="expiryDate"
              {...register('expiryDate', {
                required: 'Expiry date is required',
              })}
              className={`w-full px-4 py-2 border ${
                errors.expiryDate ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="MM/YY"
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-sm mt-2">{errors.expiryDate.message}</p>
            )}
          </div>

          {/* CVV Input */}
          <div className="mb-4">
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              {...register('cvv', { required: 'CVV is required' })}
              className={`w-full px-4 py-2 border ${
                errors.cvv ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="Enter CVV"
            />
            {errors.cvv && <p className="text-red-500 text-sm mt-2">{errors.cvv.message}</p>}
          </div>

          {/* Selected Plan Price Display */}
          {plan && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md border border-gray-300">
              <h3 className="text-lg font-semibold">Billing Summary</h3>
              <p className="text-gray-700">
                Selected Plan: <span className="font-bold">{plan.replace('-', ' ')}</span>
              </p>
              <p className="text-gray-700">
                Price: <span className="font-bold">${selectedPlanPrice}</span>
              </p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white w-full py-2 rounded-md mt-6"
          >
            Pay Now
          </Button>
        </form>
      </Card>
    </div>
  );
}
