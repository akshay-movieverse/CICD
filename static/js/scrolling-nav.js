const scrollNav = document.getElementById('scrollNav');
if (scrollNav) {
    function tsCreateItem(element, attr, attrVal) {
        const item = document.createElement(element)
        item.setAttribute(attr, attrVal)
        return item
    }

    function tsAppendItem(item, child) {
        item.appendChild(child)
    }

    // Detect Touchscreens
    function detectTouch() {
        return 'ontouchstart' in window || navigator.maxTouchPoints
    }

    // Set class to HTML
    function setTouchDetection() {
        if (detectTouch()) {
            document.documentElement.classList.add('has-touch')
        } else {
            document.documentElement.classList.add('no-touch')
        }
    }

    // Call detetction
    setTouchDetection()
        // Scrollable Navigation
        {
            // Return if overflowing
            function detectOverflow(element) {
                return element.scrollWidth > element.offsetWidth
            }

            // Set class if overflowing
            function setOverflowClass(element, className) {
                if (detectOverflow(element)) {
                    element.parentNode.classList.add(className)
                } else {
                    element.parentNode.classList.remove(className)
                }
            }

            // Loop through all Elements
            function setOverflowStatus(elements, className) {
                elements.forEach(element => {
                    setOverflowClass(element, className)
                })
            }

            // Add Class
            function addClass(element, className) {
                element.classList.add(className)
            }

            // Remove Class
            function removeClass(element, className) {
                element.classList.remove(className)
            }

            // Detect Track Position
            function detectTrackPosition(element, leftArrow, rightArrow, className) {
                if (element.scrollLeft === 0) {
                    addClass(leftArrow, className)
                }
                element.addEventListener('scroll', e => {
                    const scrollLeftPosition = e.currentTarget.scrollLeft
                    const amountScrolled = e.currentTarget.scrollWidth - e.currentTarget.offsetWidth

                    if (scrollLeftPosition === 0) {
                        addClass(leftArrow, className)
                        removeClass(rightArrow, className)
                    } else if (scrollLeftPosition === amountScrolled) {
                        addClass(rightArrow, className)
                        removeClass(leftArrow, className)
                    } else {
                        removeClass(leftArrow, className)
                        removeClass(rightArrow, className)
                    }
                })
            }

            function resetTrack(element) {
                setTimeout(() => {
                    if (element.scrollLeft !== 0) {
                        element.scrollBy({ left: 0, behavior: 'smooth' })
                    }
                }, 100)
            }

            function moveTrack(element, trackWidth, leftArrow, rightArrow) {
                leftArrow.addEventListener('click', e => {
                    element.scrollBy({ left: -trackWidth, behavior: 'smooth' })
                })
                rightArrow.addEventListener('click', e => {
                    element.scrollBy({ left: +trackWidth, behavior: 'smooth' })
                })
            }

            // Variables
            const navigations = document.querySelectorAll('#scrollNav')
            const navigationsTrack = document.querySelectorAll('.scrollable-nav__track')

            // Loop through all navigations if there a multiple
            navigations.forEach(nav => {
                const track = nav.querySelector('[data-scroll="track"]')
                const trackWidth = track.offsetWidth / 2
                const leftArrow = nav.querySelector('[data-scroll="left-btn"]')
                const rightArrow = nav.querySelector('[data-scroll="right-btn"]')
                const trackItems = Array.from(track.children)

                track.addEventListener('click', e => {
                    const trackItem = e.target.closest('li')
                    trackItems.forEach(item => item.classList.remove('is-selected'))
                    trackItem.classList.add('is-selected')

                    // Center in focus element
                    const trackItemPos = parseInt(trackItem.getBoundingClientRect().left - 40)
                    const trackCenter = track.offsetWidth / 2
                    const newTrackPosition = trackCenter - trackItem.offsetWidth / 2
                    const trackMoveAmount = trackItemPos - newTrackPosition
                    track.scrollBy({ left: +trackMoveAmount, behavior: 'smooth' })
                })

                // Reset track position if not 0
                resetTrack(track)

                // Detect track position and set classes accordingly
                detectTrackPosition(track, leftArrow, rightArrow, 'inactive')

                // Move track with arrows
                moveTrack(track, trackWidth, leftArrow, rightArrow)
            })

            window.addEventListener('load', e => {
                setOverflowStatus(navigationsTrack, 'overflowing')

                window.addEventListener('resize', e => {
                    setOverflowStatus(navigationsTrack, 'overflowing')
                })
            })
        }
}