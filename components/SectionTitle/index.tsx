type SectionTitleProps = {
    id:string,
    title:string,
    engTitle:string,
}

export default function SectionTitle({title,engTitle,id}:SectionTitleProps) : JSX.Element {

    return (
        <div className="section-title" id={id}>
            <h1>{title}</h1><div className="section-title__eng-title"><p>{engTitle}</p></div>
        </div>
    );
}