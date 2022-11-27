import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { FC } from "react";

// eslint-disable-next-line fp/no-rest-parameters
function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const DropdownLink: FC<{ active: boolean; href: string; title: string }> = ({
  active,
  href,
  title,
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      className={classNames(
        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
        "flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
      )}
    >
      {title}
      <ArrowTopRightOnSquareIcon aria-hidden="true" className="w-4 h-4" />
    </Link>
  );
};
export default DropdownLink;
