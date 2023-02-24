import { TweenLite } from 'gsap';
import { Linear, RoughEase } from 'gsap/all';

export function animateTitle() {
    TweenLite.fromTo(".hero-title h1", 0.3, {
      x: -6,
      y: 2,
      opacity: 0,
    }, {
      delay: 3,
      x: 6,
      y: -2,
      opacity: 1,
      ease: RoughEase.ease.config({
        strength: 8,
        points: 40,
        template: Linear.easeNone,
        randomize: false
      }),
      clearProps: "all"
    });

    TweenLite.fromTo(".hero-title span", 0.3, {
        x: -6,
        y: 2,
        opacity: 0,
      }, {
        delay: 2,
        x: 6,
        y: -2,
        opacity: 2,
        ease: RoughEase.ease.config({
          strength: 8,
          points: 40,
          template: Linear.easeNone,
          randomize: false
        }),
        clearProps: "all"
      });

      TweenLite.fromTo(".hero-title p", 0.3, {
        x: -6,
        y: 2,
        opacity: 0,
      }, {
        delay: 1,
        x: 6,
        y: -2,
        opacity: 1,
        ease: RoughEase.ease.config({
          strength: 8,
          points: 40,
          template: Linear.easeNone,
          randomize: false
        }),
        clearProps: "all"
      });
      TweenLite.fromTo(".btn", 0.3, {
        x: -6,
        y: 2,
        opacity: 0,
      }, {
        delay: 7,
        x: 6,
        y: -2,
        opacity: 1,
        ease: RoughEase.ease.config({
          strength: 8,
          points: 40,
          template: Linear.easeNone,
          randomize: false
        }),
        clearProps: "all"
      });
  }

  export function animateBoxes() {
    TweenLite.fromTo("#box-1", 0.3, {
      x: -6,
      y: 2,
      opacity: 0,
    }, {
      delay: 4,
      x: 6,
      y: -2,
      opacity: 1,
      ease: RoughEase.ease.config({
        strength: 8,
        points: 40,
        template: Linear.easeNone,
        randomize: false
      }),
      clearProps: "all"
    });

    TweenLite.fromTo("#box-2", 0.3, {
      x: -6,
      y: 2,
      opacity: 0,
    }, {
      delay: 5,
      x: 6,
      y: -2,
      opacity: 1,
      ease: RoughEase.ease.config({
        strength: 8,
        points: 40,
        template: Linear.easeNone,
        randomize: false
      }),
      clearProps: "all"
    });
    TweenLite.fromTo("#box-3", 0.3, {
      x: -6,
      y: 2,
      opacity: 0,
    }, {
      delay: 6,
      x: 6,
      y: -2,
      opacity: 1,
      ease: RoughEase.ease.config({
        strength: 8,
        points: 40,
        template: Linear.easeNone,
        randomize: false
      }),
      clearProps: "all"
    });



  }