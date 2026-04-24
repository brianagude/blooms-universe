import { InstagramIcon } from "./icons/instagram"

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-4 relative z-10">
      <div className="px-4 flex justify-between items-center sm:px-10">
        <p className="text-base not-italic font-medium leading-6">&copy; {year} Blooms Universe LLC</p>
        <div className="flex items-center justify-center flex-wrap gap-6">
          <button type="button"  className="text-base font-extrabold leading-7 tracking-wide md:tracking-wider uppercase">News</button>
          <a 
            href="https://www.instagram.com/bloomsuniverse?igsh=MTFhNnJ0ZHBuejA1aw%3D%3D" 
            target="_blank" rel="noopener"
          >
            <InstagramIcon/>
          </a>
        </div>
      </div>
    </footer>
  );
}
