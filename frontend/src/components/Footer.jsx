import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 text-center py-4 mt-auto border-t">
      <p className="text-sm">
        © {new Date().getFullYear()} Job Finder. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
