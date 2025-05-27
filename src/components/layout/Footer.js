'use client';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:order-2 space-x-6">
            <a href="#" className="text-white hover:text-secondary">
              Terms
            </a>
            <a href="#" className="text-white hover:text-secondary">
              Privacy
            </a>
            <a href="#" className="text-white hover:text-secondary">
              Contact
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-sm">
              &copy; {new Date().getFullYear()} Finequity. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;