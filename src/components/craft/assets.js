export const LoadingSpinner = () => (
  <div class="flex space-x-1 ">
    <div class="w-2 h-3 bg-gray-500 rounded-full animate-blink"></div>
    <div class="w-2 h-3 bg-gray-500 rounded-full animate-blink [animation-delay:0.2s]"></div>
    <div class="w-2 h-3 bg-gray-500 rounded-full animate-blink [animation-delay:0.4s]"></div>
  </div>
);

export const CloseIcon = () => {
  return (
    <svg
      fill="#000000"
      width="15px"
      height="15px"
      viewBox="-6 -6 24 24"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin"
      class="jam jam-close"
    >
      <path d="M7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485 2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535 3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z" />
    </svg>
  );
};
