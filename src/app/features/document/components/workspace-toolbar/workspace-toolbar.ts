import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';

@Component({
  selector: 'app-workspace-toolbar',
  imports: [],
  templateUrl: './workspace-toolbar.html',
  styleUrl: './workspace-toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceToolbar {
  readonly documentName = input.required<string>();
  readonly zoomLabel = input.required<string>();
  readonly isAddingText = input.required<boolean>();
  readonly annotationText = input.required<string>();

  readonly zoomInClicked = output<void>();
  readonly zoomOutClicked = output<void>();
  readonly addTextClicked = output<void>();
  readonly saveClicked = output<void>();
  readonly annotationTextChanged = output<string>();

  onTextInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.annotationTextChanged.emit(input.value);
  }
}
