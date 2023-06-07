
interface ListItemProps {
    content: string,
}
const ListItem: React.FC<ListItemProps> = ({
    content,
}) => {
    return (
        <div className='
            flex
            items-center justify-start 
            w-full
            gap-2
            mt-3
        '>
            <i className='
                fa fa-circle fa-xs
                text-gray-400
                leading-5
                w-[20px]
            '/>
            <li className="text-gray-500">{content}</li>
        </div>
    )
}

export default ListItem