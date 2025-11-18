import React from 'react';

// Interface para definir os tipos das props
interface TitleProps {
  text: string;
  iconSrc?: string;
  size?: 'sm' | 'lg';
  as?: React.ElementType;
}

// Interface para definir os tipos dos estilos
interface SizeStyles {
  [key: string]: {
    container: string;
    text: string;
  }
}

const Title: React.FC<TitleProps> = ({ 
  text, 
  iconSrc, 
  size = 'sm',
  as: Tag = 'h2'
}) => {

  // Maps the 'size' prop to Tailwind classes for height and font size
  const sizeStyles: SizeStyles = {
    lg: {
      container: 'h-[40px]', // Exact 50px height
      text: 'text-[40px]'      // Font size for 50px
    },
    sm: {
      container: 'h-[36px]', // Exact 42px height
      text: 'text-[36px]'      // Font size for 42px
    }
  };

  // Selects the correct style set
  const styles = sizeStyles[size];

  return (
    // Uses the dynamic tag (h1 or h2)
    // Applies Tailwind classes for layout and height
    <Tag className={`inline-flex items-center gap-4 ${styles.container}`}>
      {iconSrc && (
        // Icon takes the full height of the container
        <img src={iconSrc} alt="" className="h-full w-auto" />
      )}

      {/* Applies Tailwind classes for font size, custom font, color, and weight */}
      <span className={`${styles.text} text-[#d43f5d]`}>
        {text}
      </span>
    </Tag>
  );
};

export default Title;