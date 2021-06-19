type SectionTitleProps = {
    title:string,
    engTitle:string,
}

export default function SectionTitle({title,engTitle}:SectionTitleProps) : JSX.Element {

    return (
        <div className="section-title">
            <h1>{title}</h1><div className="section-title__eng-title"><p>{engTitle}</p></div>
        </div>
    );
}