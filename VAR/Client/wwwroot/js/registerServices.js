if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('service worker installed'))
        .catch(err => console.error('Error', err))
}

// Detects if device is in standalone mode
window.isInStandaloneMode = function () {
    if (('standalone' in window.navigator) && (window.navigator.standalone)) return true
    return false
}

window.addEventListener('beforeinstallprompt', function(e) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault()
    // Stash the event so it can be triggered later.
    window.deferredPWAPrompt = e
})

window.BlazorPWA = {
    installPWA: function () {
        window.deferredPWAPrompt.prompt() // Wait for the user to respond to the prompt
        window.deferredPWAPrompt.userChoice
            .then(function (choiceResult) {

                if (choiceResult.outcome === 'accepted')
                    console.log('User accepted the A2HS prompt')
                else
                    console.log('User dismissed the A2HS prompt')

                window.deferredPWAPrompt = null
                window.removeEventListener('beforeinstallprompt', beforeinstallprompt)
            })
    }
}