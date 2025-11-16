/* eslint-disable eslint-plugin-wisemen/explicit-function-return-type-with-regex */
// import { setupButtonStyle } from '~base/styles/button/button.style'

import { defineComponentVariant } from '@wisemen/vue-core-components'

// Extend the ComponentVariants interface to include the new variant

export function setupStyles() {
  // setupButtonStyle()
  const componentVariants = [
    defineComponentVariant({
      config: {
        root: `
        rounded-none border-none text-primary bg-primary
        data-[loading=false]:not-disabled:hover:bg-primary
        data-[loading=true]:bg-primary
        data-[loading=false]:not-disabled:hover:underline data-[loading=false]:not-disabled:active:underline
        shadow-none
        lowercase
        data-[loading=false]:not-disabled:hover:brightness-100 data-[loading=false]:not-disabled:active:brightness-100
        `,

      },
      target: {
        prop: 'variant',
        value: 'primary',
      },
      theme: 'default',
      component: 'button',
    }),

    defineComponentVariant({
      config: {
        root: `
        rounded-none border-none text-brand-secondary bg-brand-secondary
        data-[loading=false]:not-disabled:hover:bg-brand-secondary
        data-[loading=false]:not-disabled:active:brightness-98 
        data-[loading=true]:bg-brand-secondary
        lowercase
        data-[loading=false]:not-disabled:hover:underline
        shadow-none
        `,
      },
      target: {
        prop: 'variant',
        value: 'secondary',
      },
      theme: 'default',
      component: 'button',
    }),

    defineComponentVariant({
      config: {
        root: `
        rounded-none border-none text-brand-secondary bg-transparent
        data-[loading=false]:not-disabled:hover:transparent
        data-[loading=false]:not-disabled:active:brightness-98 
        data-[loading=true]:transparent
        data-[loading=false]:not-disabled:hover:underline
        shadow-none
        `,
      },
      target: {
        prop: 'variant',
        value: 'transparent',
      },
      theme: 'default',
      component: 'button',
    }),

    defineComponentVariant({
      config: {
        root: `
        text-md px-0
        `,
      },
      target: {
        prop: 'size',
        value: 'md',
      },
      theme: 'default',
      component: 'button',
    }),

    defineComponentVariant({
      config: {
        input: `px-0`,
        root: `
         border-0 border-b border-gray-500 rounded-none shadow-none focus-within:border-black outline-none
      `,
      },
      theme: 'default',
      component: 'textField',
    }),

    defineComponentVariant({
      config: {
        baseMultiple: `!px-0`,
        baseSingle: `px-0`,
        iconRight: 'text-primary',
        item: `rounded-none`,
        placeholder: 'px-0',
        popover: {
          content: `rounded-none border-black/40 border p-0`,
        },
        root: `
         px-0 border-0 border-b border-gray-500 rounded-none shadow-none focus-within:border-black outline-none
        `,
      },
      theme: 'default',
      component: 'select',
    }),

    defineComponentVariant({
      config: {
        root: `
          !rounded-none !border-gray-500 !bg-primary
        `,
      },
      target: {
        prop: 'variant',
        value: 'translucent',
      },
      theme: 'default',
      component: 'badge',
    }),

    defineComponentVariant({
      config: {
        control: `
          rounded-none border-black 
          group-data-[state=checked]/checkbox:bg-black 
          group-data-[state=unchecked]/checkbox:border-black group-data-[state=checked]/checkbox:border-black
          size-4
        `,
        indicator: `rounded-none border-black`,
        root: `
          rounded-none border-black
        `,
      },
      theme: 'default',
      component: 'checkbox',
    }),

    defineComponentVariant({
      config: {
        indicator: `rounded-none bg-black`,
        item: `data-[state=active]:text-primary  data-[state=inactive]:text-primary/40 disabled:opacity-75 px-6`,
      },
      target: {
        prop: 'variant',
        value: 'underline',
      },
      theme: 'default',
      component: 'tabs',
    }),

    defineComponentVariant({
      config: {
        control: `
        group-focus-visible/radio-group-item:outline-black
        group-focus-visible/radio-group-item:group-data-invalid/radio-group-item:outline-error-600 
        rounded-none
        group-data-[state=checked]/radio-group-item:bg-black
        group-data-[state=unchecked]/radio-group-item:bg-white
        w-4 h-5 duration-200`,
        indicator: 'h-0 w-0',
      },
      theme: 'default',
      component: 'radioGroupItem',
    }),

    defineComponentVariant({
      config: {
        header: `border-b border-black`,
        headerCell: `bg-white`,
        root: `
          border-0 border-b border-gray-500 rounded-none shadow-none focus-within:border-black outline-none
        `,
        row: `border-b border-transparent`,
      },
      theme: 'default',
      component: 'table',
    }),

    defineComponentVariant({
      config: {
        root: `shadow-none rounded-none border-none focus-within:border-black outline-none`,

      },
      theme: 'default',
      component: 'iconButton',
    }),

    defineComponentVariant({
      config: {
        root: `text-white bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent`,

      },
      target: {
        prop: 'variant',
        value: 'transparent',
      },
      theme: 'default',
      component: 'iconButton',
    }),

  ]

  return componentVariants
}

declare module '@wisemen/vue-core-components' {
  interface ComponentVariants {
    variants: ReturnType<typeof setupStyles>
  }
}
