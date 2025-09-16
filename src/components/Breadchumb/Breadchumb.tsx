import Link from "next/link";

type BreadcrumbType = {
  to: string;
  label: string;
};

interface BreadcrumbProps {
  links: Array<BreadcrumbType>;
}

function Breadcrumb({ links }: BreadcrumbProps) {
  return (
    <nav
      className="relative py-2 text-white text-sm font-medium flex mb-4"
      aria-label="Breadcrumb"
    >
      <ol className="list-none p-0 inline-flex items-center">
        {links.map((link, index) => (
          <li key={link.to}>
            <span className={`${index === 0 ? "hidden" : "px-2"} `}>/</span>
            <Link
              href={link.to}
              className={
                index === links.length - 1
                  ? "text-blue-500 font-semibold hover:text-blue-400"
                  : "text-white hover:text-blue-400"
              }
            >
              {link.label}
              {links.length === 1 && <span className={`px-2`}>/</span>}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
