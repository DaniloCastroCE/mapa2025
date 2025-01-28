class Loading {
    constructor(id) {
        this.loading = document.querySelector(`#${id}`)
    }

    loading() {
        this.loading.style.display = "flex"
        if (!this.loading.classList.contains('anamationFadeIn') && !this.loading.classList.contains('anamationFadeOut')) {
            lthis.oading.classList.add('anamationFadeIn')
        }
        else if (this.loading.classList.contains('anamationFadeIn')) {
            this.loading.classList.remove('anamationFadeIn')
            this.loading.classList.add('anamationFadeOut')
        }
        else if (this.loading.classList.contains('anamationFadeOut')) {
            this.loading.classList.remove('anamationFadeOut')
            this.loading.classList.add('anamationFadeIn')
        }
    }
    in () {
        this.loading.style.display = "flex"
        if (!this.loading.classList.contains('anamationFadeIn') && !this.loading.classList.contains('anamationFadeOut')) {
            this.loading.classList.add('anamationFadeIn')
        }else if (this.loading.classList.contains('anamationFadeOut')) {
            this.loading.classList.remove('anamationFadeOut')
            this.loading.classList.add('anamationFadeIn')
        }
    }
    out () {
        this.loading.style.display = "flex"
        if (this.loading.classList.contains('anamationFadeIn')) {
            this.loading.classList.remove('anamationFadeIn')
            this.loading.classList.add('anamationFadeOut')
        }
    }
}