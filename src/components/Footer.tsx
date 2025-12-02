// components/Footer.tsx
import Link from "next/link";
import { Facebook, Twitter, Github, Instagram } from "lucide-react"; // if using lucide-react icons

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-6 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* --- Brand Section --- */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">MyApp</h2>
          <p className="text-sm text-slate-400 mb-4">
            Building modern web experiences with Next.js and Tailwind.
          </p>
          <div className="flex gap-3">
            <Link href="https://github.com" className="hover:text-white">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="https://twitter.com" className="hover:text-white">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="https://facebook.com" className="hover:text-white">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="https://instagram.com" className="hover:text-white">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* --- Company Links --- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* --- Resources --- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
            <li><Link href="/support" className="hover:text-white">Support</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQs</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
          </ul>
        </div>

        {/* --- Newsletter --- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Subscribe</h3>
          <p className="text-sm text-slate-400 mb-4">
            Get the latest updates straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-md bg-slate-800 text-sm text-white border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-sm font-semibold rounded-md hover:bg-indigo-500"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* --- Footer bottom --- */}
      <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} MyApp. All rights reserved.</p>
        <p className="text-xs text-slate-600 mt-2">
          Built with ❤️ using Next.js + Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
