(() => {
  function getLinkContainingText(text) {
    const allLinks = document.querySelectorAll('a');
    for (const link of allLinks) {
      if (link.textContent.includes(text)) {
        return link.href;
      }
    }
    return null;
  }
  function processDropdownAndLink(dropdownId) {
    const dropdownButton = document.querySelector(`span#qd-dd-${dropdownId}[role="button"]`);
    if (dropdownButton) {
      dropdownButton.click();
      setTimeout(() => {
        const licenseLink = getLinkContainingText("License");
        if (licenseLink) {
          console.log(`License link for qd-dd-${dropdownId}:`, licenseLink);
        } else {
          console.log(`License link not found for qd-dd-${dropdownId}`);
        }
        dropdownButton.click();
        processNextDropdown(dropdownId + 1);
      }, 1000);
    } else {
      console.log(`Dropdown button qd-dd-${dropdownId} not found`);
    }
  }
  function processNextDropdown(nextDropdownId) {
    if (nextDropdownId <= 10) {
      processDropdownAndLink(nextDropdownId);
    }
  }
  processDropdownAndLink(0);
})();
