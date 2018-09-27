export class SelectionHandles extends HTMLElement {
  
  constructor() {
    super()
    this.$shadow = this.attachShadow({mode: 'open'})
  }

  connectedCallback() {}
  disconnectedCallback() {}

  set position({boundingRect, node_label_id}) {
    this.$shadow.innerHTML  = this.render(boundingRect, node_label_id)
  }

  render({ x, y, width, height, top, left }, node_label_id) {
    this.$shadow.host.setAttribute('data-label-id', node_label_id)
    return `
      ${this.styles({top,left})}
      <svg 
        class="pb-handles"
        width="${width}" height="${height}" 
        viewBox="0 0 ${width} ${height}" 
        version="1.1" xmlns="http://www.w3.org/2000/svg"
      >
        <rect stroke="hotpink" fill="none" width="100%" height="100%"></rect>
        <circle stroke="hotpink" fill="white" cx="0" cy="0" r="2"></circle>
        <circle stroke="hotpink" fill="white" cx="100%" cy="0" r="2"></circle>
        <circle stroke="hotpink" fill="white" cx="100%" cy="100%" r="2"></circle>
        <circle stroke="hotpink" fill="white" cx="0" cy="100%" r="2"></circle>
        <circle fill="hotpink" cx="${width/2}" cy="0" r="2"></circle>
        <circle fill="hotpink" cx="0" cy="${height/2}" r="2"></circle>
        <circle fill="hotpink" cx="${width/2}" cy="${height}" r="2"></circle>
        <circle fill="hotpink" cx="${width}" cy="${height/2}" r="2"></circle>
      </svg>
    `
  }

  styles({top,left}) {
    return `
      <style>
        :host > svg {
          position: absolute;
          top: ${top + window.scrollY}px;
          left: ${left}px;
          overflow: visible;
          pointer-events: none;
          z-index: 9999;
        }
      </style>
    `
  }
}

customElements.define('pb-handles', SelectionHandles)