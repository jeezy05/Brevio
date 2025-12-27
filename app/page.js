"use client";
import { Button } from "../components/ui/button";
import { UserButton, useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "../convex/_generated/api";
import Image from "next/image";
import {
  ArrowRight,
  FileText,
  Brain,
  Zap,
  CheckCircle,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { user, isLoaded } = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (isLoaded && user) {
      CheckUser();
      // Redirect to dashboard after successful login
      window.location.href = "/dashboard";
    }
  }, [user, isLoaded]);

  const CheckUser = async () => {
    try {
      const result = await createUser({
        userName: user?.fullName || "",
        email: user?.primaryEmailAddress?.emailAddress || "",
        imageUrl: user?.imageUrl || "",
      });
      console.log(result);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="Brevio Logo"
              width={75}
              height={50}
              className="pl-4"
            /> 
            <span className="text-2xl font-bold text-gray-900">Brevio</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              How it Works
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {isLoaded ? (
              user ? (
                <UserButton />
              ) : (
                <div className="flex items-center space-x-2">
                  <SignInButton mode="modal">
                    <Button variant="ghost">Sign In</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button>Get Started</Button>
                  </SignUpButton>
                </div>
              )
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" disabled>
                  Sign In
                </Button>
                <Button disabled>Get Started</Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Note Taking
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your PDFs into
            <span className="text-emerald-600 block">Smart Notes</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Brevio uses advanced AI to automatically extract key insights,
            create summaries, and generate intelligent notes from your PDF
            documents. Study smarter, not harder.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {isLoaded ? (
              user ? (
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              ) : (
                <SignUpButton mode="modal">
                  <Button
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg"
                  >
                    Start Taking Smart Notes
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </SignUpButton>
              )
            ) : (
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg"
                disabled
              >
                Loading...
              </Button>
            )}
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
              Free to start
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
              Instant setup
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful AI Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of document analysis with our cutting-edge
              AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                AI-Powered Analysis
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our advanced AI reads and understands your PDFs, extracting key
                concepts, themes, and important information automatically.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Smart Summaries
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get concise, intelligent summaries of lengthy documents. Perfect
                for research, studying, and quick document reviews.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Instant Notes
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Generate structured notes, bullet points, and key takeaways in
                seconds. Save hours of manual note-taking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Brevio Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform your PDFs into intelligent notes in just three simple
              steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Upload Your PDF
              </h3>
              <p className="text-gray-600">
                Simply drag and drop your PDF document or click to upload.
                Brevio supports all standard PDF formats.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                AI Analysis
              </h3>
              <p className="text-gray-600">
                Our AI processes your document, understanding context,
                extracting key information, and identifying important concepts.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Get Smart Notes
              </h3>
              <p className="text-gray-600">
                Receive comprehensive notes, summaries, and insights. Export,
                share, or continue editing as needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Students and Professionals
            </h2>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Note-Taking?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join students and professionals who are already using Brevio to
            study more efficiently and work smarter.
          </p>
          {isLoaded ? (
            user ? (
              <Button
                size="lg"
                className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                onClick={() => (window.location.href = "/dashboard")}
              >
                Go to Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            ) : (
              <SignUpButton mode="modal">
                <Button
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  Get Started for Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </SignUpButton>
            )
          ) : (
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              disabled
            >
              Loading...
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/logo.svg"
                  alt="Brevio Logo"
                  width={40}
                  height={27}
                />
                <span className="text-xl font-bold">Brevio</span>
              </div>
              <p className="text-gray-400">
                AI-powered PDF note-taking for the modern learner.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Brevio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
