import React from "react";

interface ExampleComponentProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const ExampleComponent: React.FC<ExampleComponentProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="example-component">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {children && <div className="example-content">{children}</div>}
    </div>
  );
};

export default ExampleComponent;
