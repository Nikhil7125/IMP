// let highestZ = 1;

// class Paper {
//   holdingPaper = false;
//   mouseTouchX = 0;
//   mouseTouchY = 0;
//   mouseX = 0;
//   mouseY = 0;
//   prevMouseX = 0;
//   prevMouseY = 0;
//   velX = 0;
//   velY = 0;
//   rotation = Math.random() * 30 - 15;
//   currentPaperX = 0;
//   currentPaperY = 0;
//   rotating = false;

//   init(paper) {
//     document.addEventListener('mousemove', (e) => {
//       if(!this.rotating) {
//         this.mouseX = e.clientX;
//         this.mouseY = e.clientY;
        
//         this.velX = this.mouseX - this.prevMouseX;
//         this.velY = this.mouseY - this.prevMouseY;
//       }
        
//       const dirX = e.clientX - this.mouseTouchX;
//       const dirY = e.clientY - this.mouseTouchY;
//       const dirLength = Math.sqrt(dirX*dirX+dirY*dirY);
//       const dirNormalizedX = dirX / dirLength;
//       const dirNormalizedY = dirY / dirLength;

//       const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
//       let degrees = 180 * angle / Math.PI;
//       degrees = (360 + Math.round(degrees)) % 360;
//       if(this.rotating) {
//         this.rotation = degrees;
//       }

//       if(this.holdingPaper) {
//         if(!this.rotating) {
//           this.currentPaperX += this.velX;
//           this.currentPaperY += this.velY;
//         }
//         this.prevMouseX = this.mouseX;
//         this.prevMouseY = this.mouseY;

//         paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
//       }
//     })

//     paper.addEventListener('mousedown', (e) => {
//       if(this.holdingPaper) return; 
//       this.holdingPaper = true;
      
//       paper.style.zIndex = highestZ;
//       highestZ += 1;
      
//       if(e.button === 0) {
//         this.mouseTouchX = this.mouseX;
//         this.mouseTouchY = this.mouseY;
//         this.prevMouseX = this.mouseX;
//         this.prevMouseY = this.mouseY;
//       }
//       if(e.button === 2) {
//         this.rotating = true;
//       }
//     });
//     window.addEventListener('mouseup', () => {
//       this.holdingPaper = false;
//       this.rotating = false;
//     });
//   }
// }

// const papers = Array.from(document.querySelectorAll('.paper'));

// papers.forEach(paper => {
//   const p = new Paper();
//   p.init(paper);
// });

let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchX = 0;
  touchY = 0;
  currentPaperX = 0;
  currentPaperY = 0;
  rotation = Math.random() * 30 - 15;
  rotating = false;

  init(paper) {
    paper.addEventListener('pointermove', (e) => {
      if (!this.rotating && this.holdingPaper) {
        const velX = e.clientX - this.touchX;
        const velY = e.clientY - this.touchY;
        
        this.currentPaperX += velX;
        this.currentPaperY += velY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }

      const dirX = e.clientX - this.touchX;
      const dirY = e.clientY - this.touchY;
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;

      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = 180 * angle / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      if (this.rotating) {
        this.rotation = degrees;
        paper.style.transform = `rotateZ(${this.rotation}deg)`;
      }
    });

    paper.addEventListener('pointerdown', (e) => {
      if (this.holdingPaper) return;

      this.holdingPaper = true;
      this.touchX = e.clientX;
      this.touchY = e.clientY;
      this.currentPaperX = 0;
      this.currentPaperY = 0;

      paper.style.zIndex = highestZ;
      highestZ += 1;

      if (e.pointerType === 'touch') {
        this.touchX = e.clientX;
        this.touchY = e.clientY;
      }
    });

    window.addEventListener('pointerup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
