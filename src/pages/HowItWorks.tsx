
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Shuffle, 
  CheckCircle, 
  Users, 
  MessageCircle,
  ShieldCheck,
  BrainCircuit,
  Clock,
  Zap
} from 'lucide-react';

const HowItWorks = () => {
  const benefits = [
    {
      icon: <BrainCircuit className="h-6 w-6" />,
      title: "Learn New Skills",
      description: "Expand your knowledge and skillset without spending money."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Build Connections",
      description: "Connect with like-minded individuals who share your interests."
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Safe Environment",
      description: "Our platform ensures secure and respectful exchanges."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Flexible Schedule",
      description: "Arrange sessions at times that work for both parties."
    }
  ];

  const faqs = [
    {
      question: "Is it completely free to use?",
      answer: "Yes! Knowledge Barter Exchange is 100% free to use. We don't charge any fees for connecting users or facilitating exchanges. The platform is built on the principle of mutual value exchange through knowledge sharing rather than monetary transactions."
    },
    {
      question: "How do I ensure the quality of the skills I'll learn?",
      answer: "Each user profile includes ratings and reviews from previous exchanges. Before agreeing to an exchange, you can review a person's profile, check their expertise, and see feedback from others. If you're unsatisfied with an exchange, our community guidelines provide steps for resolution."
    },
    {
      question: "What if someone doesn't fulfill their part of the exchange?",
      answer: "We encourage users to agree on clear expectations before starting an exchange. If issues arise, we have a resolution process that includes mediation. Consistent failure to fulfill exchange commitments can result in account restrictions."
    },
    {
      question: "How much time should I commit to an exchange?",
      answer: "The time commitment is flexible and decided between the two parties. Some exchanges might be a single one-hour session, while others could be multiple sessions over several weeks. We recommend discussing and agreeing on the scope and time commitment before starting."
    },
    {
      question: "Can I exchange with someone in a different country?",
      answer: "Absolutely! Our platform connects users globally. Remote exchanges can be conducted via video calls, chat, or other virtual means. This also creates opportunities for cultural exchange alongside skill sharing."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Create your profile",
      description: "Sign up and list the skills you're willing to share with others, along with skills you're interested in learning."
    },
    {
      number: "02",
      title: "Browse available skills",
      description: "Explore the diverse range of skills offered by our community members. Use filters to find exactly what you're looking for."
    },
    {
      number: "03",
      title: "Send exchange requests",
      description: "When you find a skill you want to learn, send an exchange request offering one of your skills in return."
    },
    {
      number: "04",
      title: "Negotiate and agree",
      description: "Discuss with the other person to agree on the scope, format, and schedule of your knowledge exchange."
    },
    {
      number: "05",
      title: "Exchange knowledge",
      description: "Conduct your sessions via your preferred method—in person, video call, chat, or other formats."
    },
    {
      number: "06",
      title: "Provide feedback",
      description: "After completing the exchange, leave feedback to help maintain the quality of our community."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted/30 py-16 md:py-24">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll">
            <Badge variant="outline" className="mb-4">Our Process</Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              How Knowledge Barter Works
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Our platform makes it easy to connect with others who want to share knowledge and skills through direct exchanges—no money involved.
            </p>
            <Link to="/signup">
              <Button size="lg">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-16 md:py-24">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <Badge variant="outline" className="mb-3">Simple Steps</Badge>
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              Exchange Knowledge in 6 Simple Steps
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our straightforward process makes it easy to start exchanging knowledge right away.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex animate-on-scroll duration-500">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="font-bold">{step.number}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exchange Illustration */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <Badge variant="outline" className="mb-3">Direct Exchange</Badge>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                A Fair Value Exchange
              </h2>
              <p className="text-muted-foreground mb-6">
                Unlike traditional learning platforms that require payment, Knowledge Barter operates on a simple principle: everyone has valuable knowledge to share.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <p>Both parties benefit from each exchange</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <p>Agree on the scope and format that works for you</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <p>No monetary transactions involved</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <p>Learn directly from experienced practitioners</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden bg-background p-8 shadow-sm border animate-on-scroll">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mr-4">
                    <span className="font-semibold">A</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Alex Morgan</h4>
                    <p className="text-sm text-muted-foreground">Web Developer</p>
                  </div>
                </div>
                <Shuffle className="h-6 w-6 text-primary" />
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mr-4">
                    <span className="font-semibold">J</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Jamie Lee</h4>
                    <p className="text-sm text-muted-foreground">Graphic Designer</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Badge>Offering</Badge>
                  <h4 className="font-medium">React Development</h4>
                  <p className="text-sm text-muted-foreground">
                    3 one-hour sessions covering React fundamentals, hooks, and state management.
                  </p>
                </div>
                <div className="space-y-3">
                  <Badge>Receiving</Badge>
                  <h4 className="font-medium">Logo Design</h4>
                  <p className="text-sm text-muted-foreground">
                    Brand identity design including logo variations, color palette, and usage guidelines.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t flex justify-between">
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button size="sm">
                  <Zap className="h-4 w-4 mr-2" />
                  Confirm Exchange
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <Badge variant="outline" className="mb-3">Benefits</Badge>
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              Why Use Knowledge Barter?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers unique advantages over traditional learning methods.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center animate-on-scroll duration-500">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <Badge variant="outline" className="mb-3">Common Questions</Badge>
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to the most common questions about using our platform.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y">
            {faqs.map((faq, index) => (
              <div key={index} className="py-6 animate-on-scroll">
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm backdrop-blur-sm border-primary-foreground/30 text-primary-foreground">
              Get Started Today
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Ready to Start Exchanging Knowledge?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join our community today and start sharing your expertise while learning new skills at no cost.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Create Your Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/skills">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Browse Available Skills
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;
