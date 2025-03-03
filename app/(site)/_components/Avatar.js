import Image from "next/image";

export default async function Avatar({ user }) {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        <Image
          alt="User Avatar"
          src={user?.image || "/images/placeholder.png"}
          fill
          sizes="(max-width: 768px) 36px, 44px"
        />
      </div>
    </div>
  );
}
