import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4  px-2">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">QB</h1>
          <div className="flex gap-2 items-center">
            <Link href={'/'} className="underline">
              Contact Us
            </Link>
            <Link legacyBehavior href={'/auth/login'}>
              <Button className="bg-blue-500 hover:bg-blue-700 text-white">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-grow bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4">
            Boost Your Child’s Academic Success
          </h2>
          <p className="text-lg mb-8">
            Choose from a wide range of courses designed for personalized
            learning and outstanding outcomes.
          </p>
          <Button className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 text-lg">
            View Courses
          </Button>
        </div>
      </section>

      {/* Courses Section */}
      <section id='products' className="py-16  px-2">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-center">
            Our Popular Courses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-4 bg-white shadow-md">
              <h4 className="text-xl font-bold mb-2">Math Mastery Program</h4>
              <p className="mb-4">
                Comprehensive math training to improve problem-solving and
                critical thinking skills.
              </p>
              <p className="text-lg font-semibold">$299 per term</p>
              <Button className="mt-4 bg-blue-500 text-white w-full">
                Enroll Now
              </Button>
            </Card>
            <Card className="p-4 bg-white shadow-md">
              <h4 className="text-xl font-bold mb-2">
                Reading & Writing Excellence
              </h4>
              <p className="mb-4">
                Enhance reading comprehension and writing skills with
                personalized guidance.
              </p>
              <p className="text-lg font-semibold">$249 per term</p>
              <Button className="mt-4 bg-blue-500 text-white w-full">
                Enroll Now
              </Button>
            </Card>
            <Card className="p-4 bg-white shadow-md">
              <h4 className="text-xl font-bold mb-2">Science Exploration</h4>
              <p className="mb-4">
                Hands-on experiments and lessons to spark curiosity and a love
                for science.
              </p>
              <p className="text-lg font-semibold">$279 per term</p>
              <Button className="mt-4 bg-blue-500 text-white w-full">
                Enroll Now
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-blue-50 py-16  px-2">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">
            Why Choose Our Prep School Courses?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <h4 className="text-xl font-bold mb-2">Expert Instructors</h4>
              <p>
                Our teachers are experts in their fields and dedicated to your
                child&apos;s success.
              </p>
            </Card>
            <Card>
              <h4 className="text-xl font-bold mb-2">Flexible Scheduling</h4>
              <p>
                We offer convenient course timings that work with your family’s
                busy schedule.
              </p>
            </Card>
            <Card>
              <h4 className="text-xl font-bold mb-2">Proven Results</h4>
              <p>
                Our courses have helped students achieve top grades and gain
                confidence in their abilities.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16  px-2">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">
            What Parents and Students Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-4 bg-white shadow-md">
              <p>
                &quot;The Math Mastery Program was a game-changer for my
                daughter. Her confidence has skyrocketed!&quot;
              </p>
              <span className="block mt-2 text-sm font-semibold">
                - Maria P., Parent
              </span>
            </Card>
            <Card className="p-4 bg-white shadow-md">
              <p>
                &quot;I was struggling with reading, but after just one term,
                I&apos;m getting A&apos;s on my essays!&rdquo;
              </p>
              <span className="block mt-2 text-sm font-semibold">
                - Josh M., Student
              </span>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-100 py-16  px-2">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">Affordable Course Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-4 bg-white shadow-md">
              <h4 className="text-xl font-bold mb-2">Basic Package</h4>
              <p>Access to one course per term.</p>
              <p className="text-lg font-semibold mt-4">$249</p>
              <Button className="mt-4 bg-blue-500 text-white w-full">
                Enroll Now
              </Button>
            </Card>
            <Card className="p-4 bg-white shadow-md">
              <h4 className="text-xl font-bold mb-2">Standard Package</h4>
              <p>
                Access to two courses per term with flexible scheduling options.
              </p>
              <p className="text-lg font-semibold mt-4">$399</p>
              <Button className="mt-4 bg-blue-500 text-white w-full">
                Enroll Now
              </Button>
            </Card>
            <Card className="p-4 bg-white shadow-md">
              <h4 className="text-xl font-bold mb-2">Premium Package</h4>
              <p>
                All-access pass to every course we offer with one-on-one
                mentoring.
              </p>
              <p className="text-lg font-semibold mt-4">$599</p>
              <Button className="mt-4 bg-blue-500 text-white w-full">
                Enroll Now
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 text-white">
        <div className="container mx-auto text-center">
          <p>© 2024 Prep School Courses. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
