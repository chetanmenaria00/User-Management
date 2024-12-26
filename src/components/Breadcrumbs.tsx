import Link from 'next/link';
import { Fragment } from 'react';
import analytics from '../../public/Icons/analytics-sharp.svg';
import Image from 'next/image';

interface Props {
  breadcrumbs: {
    title: string;
    href?: string;
  }[];
}

function BreadCrumbs({ breadcrumbs }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-start space-x-3 text-xs text-black mb-8">
      {breadcrumbs.map((breadcrumb, index) => {
        let result = null;
        if (breadcrumb.href) {
          result = <Link href={breadcrumb.href}>{breadcrumb.title}</Link>;
        } else {
          result = <span className="opacity-50">{breadcrumb.title}</span>;
        }

        return (
          <Fragment key={index}>
            <p className="hover:text-gray-600">{result}</p>
            {index !== breadcrumbs.length - 1 && (
              <Image src={analytics} alt={'analytics'} width={20} height={20} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

export default BreadCrumbs;
