import { 
    trigger, 
    state, 
    style, 
    animate, 
    transition, 
    query, 
    stagger 
  } from '@angular/animations';
  
  export const navAnimations = [
    // Logo fade-in animation
    trigger('logoFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms 150ms ease-out', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
  
    // Staggered list animation
    trigger('listStagger', [
      transition(':enter', [
        query('li', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger('80ms', [
            animate('250ms ease-out', 
              style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ])
      ])
    ]),
  
    // Hover animation
    trigger('hoverScale', [
      state('normal', style({ transform: 'scale(1)' })),
      state('hovered', style({ transform: 'scale(1.02)' })),
      transition('normal <=> hovered', animate('150ms ease-in-out'))
    ])
  ];