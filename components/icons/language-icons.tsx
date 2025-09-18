// components/icons/language-icons.tsx

// A simple component to render the correct language icon
export const LanguageIcon = ({ language, className }: { language: string, className?: string }) => {
  const baseClasses = "w-10 h-10"; // Default size
  const finalClassName = `${baseClasses} ${className}`;

  switch (language.toLowerCase()) {
    case 'python':
      return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={finalClassName}><path d="M14.12,11.38,15,12.24V14.59A2.4,2.4,0,0,1,12.6,17H11.38L10.5,16.12V13.76A2.4,2.4,0,0,1,12.9,11.38ZM11.38,9.88,10.5,9V6.65A2.4,2.4,0,0,1,12.9,4.25H14.12L15,5.13V7.5A2.4,2.4,0,0,1,12.6,9.88ZM15.8,19.35A2.4,2.4,0,0,1,13.4,21.75H9.88L9,20.87V18.5A2.4,2.4,0,0,1,11.4,16.12H12.62L13.5,17V19.35ZM8.25,4.65A2.4,2.4,0,0,1,10.65,2.25H14.12L15,3.13V5.5A2.4,2.4,0,0,1,12.6,7.88H11.38L10.5,7V4.65Z"></path></svg>;
    case 'c':
    case 'c++':
      return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={finalClassName}><path d="M13.5,13.5H16.5V10.5H13.5M13.5,10.5H10.5V13.5H13.5V16.5H10.5V13.5H7.5V10.5H10.5V7.5H13.5M15,20.4C18.5,19.5 21,16.2 21,12C21,7.8 18.5,4.5 15,3.6V2H9V3.6C5.5,4.5 3,7.8 3,12C3,16.2 5.5,19.5 9,20.4V22H15Z"></path></svg>;
    case 'java':
      return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={finalClassName}><path d="M4,11V13H11L10.5,15H7V17H10.5C11.05,17 11.5,16.55 11.5,16V14H18.5L19,12H12.5L13,10H16V8H13C12.45,8 12,8.45 12,9V10L4,11M20,16V13C20,12.45 19.55,12 19,12H18V8A2,2 0 0,0 16,6H10C8.89,6 8,6.89 8,8V7H6V9H8V15H6V17H8V18A2,2 0 0,0 10,20H13L13.5,18H19C19.55,18 20,17.55 20,17V16M16,16H10V8H16V16Z"></path></svg>;
    case 'sql':
      return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={finalClassName}><path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M9 9H6.5V10.5H9V12H6.5V13.5H9V15H5V9H9M14.5 15H12.5V9H14.5M19.5 13.5H16.5V15H15V9H19.5V10.5H16.5V11.5H19.5V13.5Z"></path></svg>;
    default:
      return null;
  }
};