import { InstagramIcon } from "./icons/instagram"

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-4 relative z-10">
      <div className="px-4 flex justify-between items-center sm:px-10">
        <p className="text-base not-italic font-medium leading-6">&copy; {year} Blooms Universe LLC</p>
        <a 
          href="https://www.instagram.com/bloomsuniverse?igsh=MTFhNnJ0ZHBuejA1aw%3D%3D" 
          target="_blank"
        >
          <InstagramIcon/>
        </a>
      </div>
    </footer>
  );
}
