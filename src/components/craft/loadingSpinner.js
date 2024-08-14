const LoadingSpinner = () => (
  <div class="flex space-x-1 ">
    <div class="w-2 h-3 bg-gray-500 rounded-full animate-blink"></div>
    <div class="w-2 h-3 bg-gray-500 rounded-full animate-blink [animation-delay:0.2s]"></div>
    <div class="w-2 h-3 bg-gray-500 rounded-full animate-blink [animation-delay:0.4s]"></div>
  </div>
);

export default LoadingSpinner;
