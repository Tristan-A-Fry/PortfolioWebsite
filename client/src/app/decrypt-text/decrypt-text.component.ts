import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-decrypt-text',
  imports: [CommonModule],
  templateUrl: './decrypt-text.component.html',
  styleUrls: ['./decrypt-text.component.css']
})
export class DecryptTextComponent implements OnInit {
  @Input() text: string = '';
  @Input() revealSpeed: number = 100; // Time in ms between each character reveal
  decryptedText: string[] = [];
  safeText: SafeHtml | undefined;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.decryptText();
  }

  decryptText(): void {
    const textWithTags = this.text;
    const textWithoutTags = textWithTags.replace(/<[^>]*>/g, '');
    const htmlTags = [...textWithTags.matchAll(/<[^>]*>/g)];

    let currentIndex = 0;
    let displayText = '';
    let tagIndex = 0;
    let offset = 0;

    const interval = setInterval(() => {
      if (currentIndex < textWithoutTags.length) {
        displayText += textWithoutTags[currentIndex];
        currentIndex++;

        // Check if we need to insert an HTML tag
        if (tagIndex < htmlTags.length && currentIndex + offset >= htmlTags[tagIndex].index!) {
          displayText += htmlTags[tagIndex][0];
          offset += htmlTags[tagIndex][0].length;
          tagIndex++;
        }

        this.safeText = this.sanitizer.bypassSecurityTrustHtml(displayText);
      } else {
        clearInterval(interval);
      }
    }, this.revealSpeed);
  }
}
