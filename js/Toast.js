class Toast {
    constructor () {

    }

    showToast(message) {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = message;
  
        toastContainer.appendChild(toast);
  
        setTimeout(() => {
          toast.remove();
        }, 3500);
      }
}