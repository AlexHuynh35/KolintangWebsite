type PageTitleProps = {
  title: string;
  description: string;
};

export default function PageTitle({ title, description }: PageTitleProps) {
  return (
    <div className="max-w-5xl mx-auto text-center text-balance p-6">
      <h1 className="font-bold text-3xl md:text-5xl text-green-700 pb-6">
        {title}
      </h1>
      <div className="flex justify-center pb-6">
        <div className="w-9/10 h-2 bg-green-600 rounded" />
      </div>
      <p className="font-semibold text-xl md:text-2xl text-gray-700">
        {description}
      </p>
    </div>
  );
}