import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-comment',
  template: `
    <div class="comment">
      <p><strong>{{ author }}</strong></p>
      <p>{{ content }}</p>
    </div>
  `,
  styles: [
    `
      .comment {
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        padding: 12px;
        margin-bottom: 12px;
        background: #fafafa;
      }
    `
  ]
})
export class ArticleCommentComponent {
  @Input() author: string = '';
  @Input() content: string = '';
}
