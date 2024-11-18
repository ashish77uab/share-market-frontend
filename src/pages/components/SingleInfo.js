const SingleInfo = ({ title, value, isImage,isBalance }) => {
    return <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-black opacity-70">
            {title}
        </label>
        {isImage ?

            <a title="View image by clicking" href={value} target="_blank"><img className="max-w-[60px] my-2 object-contain max-h-[60px]" alt={title} src={value} /></a>
            : <div className="text-base py-2 text-gray-900 font-semibold px-4 rounded-md bg-pink-100">{isBalance && 'Rs.'} {value}</div>}

    </div>
}
export default SingleInfo