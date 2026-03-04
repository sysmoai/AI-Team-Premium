import { Layout } from "@/components/layout/Layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { useCreateContact } from "@/hooks/use-contacts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      needs: "",
    },
  });

  const { mutate: submitContact, isPending } = useCreateContact();

  const onSubmit = (data: InsertContact) => {
    submitContact(data, {
      onSuccess: () => {
        form.reset();
      }
    });
  };

  return (
    <Layout>
      <div className="bg-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Left Col - Info */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Let's Start a Project</h1>
              <p className="text-lg text-muted-foreground mb-10">
                Whether you need a bulk order of AI subscriptions for your team or a complete website built from scratch, our experts are ready to assist you.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">WhatsApp / Phone</h3>
                    <p className="text-muted-foreground">+880 1533-262758</p>
                    <p className="text-sm text-muted-foreground mt-1">Available 24/7 for urgent queries</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Email Us</h3>
                    <p className="text-muted-foreground">hello@aitpbd.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Location</h3>
                    <p className="text-muted-foreground">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col - Form */}
            <div className="bg-card border border-border p-8 md:p-10 rounded-3xl shadow-xl">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="h-12 rounded-xl bg-background" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+880 1..." className="h-12 rounded-xl bg-background" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="needs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How can we help you?</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="I want to buy 3 ChatGPT Plus accounts and need a landing page design..." 
                            className="min-h-[150px] resize-none rounded-xl bg-background"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-white"
                    disabled={isPending}
                  >
                    {isPending ? "Sending..." : "Submit Request"}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    By submitting, you agree to our Privacy Policy.
                  </p>
                </form>
              </Form>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
