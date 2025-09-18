"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chrome } from "lucide-react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { signIn, signUp } from "@/lib/actions/auth.action";
import FormField from "./FormField";

// Define the FormType for clarity
type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3, "Name must be at least 3 characters") : z.string().optional(),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Handles email/password form submission
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        const { name, email, password } = data;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
        });
        if (!result.success) {
          toast.error(result.message);
          return;
        }
        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else { // 'sign-in'
        const { email, password } = data;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();
        const result = await signIn({ email, idToken });
        
        if (!result?.success) {
          toast.error(result?.message || "An unknown server error occurred.");
          return;
        }
        
        toast.success("Signed in successfully.");
        router.refresh();
        router.push("/");
      }
    } catch (error: any) {
      console.error("Form submission error:", error);

      // --- THIS IS THE CRUCIAL PART FOR HANDLING THE ERROR ---
      let errorMessage = "An unexpected error occurred. Please try again."; 

      switch (error.code) {
        case 'auth/invalid-credential':
          errorMessage = "Invalid email or password. Please check your credentials and try again.";
          break;
        case 'auth/email-already-in-use':
          errorMessage = "This email is already registered. Please sign in.";
          break;
        default:
          errorMessage = `An error occurred: ${error.message}`;
          break;
      }
      
      toast.error(errorMessage);
      // --- END OF THE ERROR HANDLING LOGIC ---
    }
  };

  // Handles Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      if (!idToken) {
        toast.error("Google Sign-in Failed. Could not get ID token.");
        return;
      }
      
      const result = await signIn({
        email: user.email!,
        idToken,
        name: user.displayName,
        image: user.photoURL,
      });

      if (!result?.success) {
        toast.error(result?.message || "An unknown server error occurred.");
        return;
      }

      toast.success("Signed in successfully with Google.");
      
      router.refresh();
      router.push("/");
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      toast.error(`Google Sign-In failed: ${error.message}`);
    }
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">Mock Interview</h2>
        </div>
        <h3>Practice job interviews with AI</h3>
        
        <Button
          onClick={handleGoogleSignIn}
          variant="outline"
          className="btn-secondary group flex items-center justify-center gap-3"
        >
          <Chrome className="transition-transform duration-300 group-hover:scale-110" />
          {isSignIn ? "Sign In with Google" : "Sign Up with Google"}
        </Button>
        
        <div className="my-2 flex items-center">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-4 text-xs font-semibold text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 form">
            {!isSignIn && (
              <FormField control={form.control} name="name" label="Name" placeholder="Your Name" type="text" />
            )}
            <FormField control={form.control} name="email" label="Email" placeholder="Your email address" type="email" />
            <FormField control={form.control} name="password" label="Password" placeholder="Enter your password" type="password" />
            <Button className="btn" type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Processing..." : (isSignIn ? "Sign In" : "Create an Account")}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link href={!isSignIn ? "/sign-in" : "/sign-up"} className="font-bold text-user-primary ml-1">
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;