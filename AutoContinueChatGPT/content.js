function waitForButtonAndClick() {
  const buttonText = "Continue generating";

  let buttonClicked = false;

  const observeChanges = () => {
    const observer = new MutationObserver((mutationsList) => {
      if (buttonClicked) {
        return;
      }

      for (const mutation of mutationsList) {
        if (mutation.addedNodes) {
          for (const node of mutation.addedNodes) {
            if (node.tagName === 'BUTTON' && node.textContent.includes(buttonText)) {
              const button = node;
              buttonClicked = true;

              setTimeout(() => {
                buttonClicked = false;
              }, 1000);

              button.click();
              return;
            }
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  };

  observeChanges();
}

waitForButtonAndClick();