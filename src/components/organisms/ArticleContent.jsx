import React from "react";
import Text from "../atoms/Text";

function ArticleContent({ author, date, paragraphs }) {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <Text variant="p" className="meta-noticia text-sm mb-3">
            Redactado por {author}, el {date}
          </Text>
          {paragraphs.map((p, index) => (
            <Text key={index} variant="p" className="parrafo-noticia mb-4 leading-relaxed">
              {p}
            </Text> 
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArticleContent;
