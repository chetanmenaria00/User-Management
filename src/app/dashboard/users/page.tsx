import BreadCrumbs from '@/components/Breadcrumbs';
import UserTable from '@/components/UserTable';
import boyPng from '../../../../public/Icons/boy.png';
import Image from 'next/image';

const breadcrumbs = [
  {
    title: 'Dashboard',
    href: '/',
  },
  {
    title: 'Users',
    href: '/dashboard/users',
  },
  {
    title: 'All',
  },
];
export default function Page() {
  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="flex justify-between items-center">
        <BreadCrumbs breadcrumbs={breadcrumbs} />
        <div className="flex text-black gap-2 items-center">
          <Image src={boyPng} alt={'GoDotFill'} width={30} height={30} />
          <p>Chetan Menaria</p>
        </div>
      </div>
      <div className="text-slate-700 space-y-1 mb-8">
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-sm">
          Manage your team membersnd their account here.
        </p>
      </div>
      <UserTable />
    </div>
  );
}
