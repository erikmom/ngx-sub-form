import { FormArray, FormControl } from '@angular/forms';
import { handleFormArrays } from 'ngx-sub-form';

describe(`helpers`, () => {
  describe('handleFormArrays', () => {
    interface FormInterface {
      foo: number[];
    }

    it('should insert as many elements into the form array as there are in the original object', () => {
      const arrayControls: { key: keyof FormInterface; control: FormArray }[] = [
        {
          key: 'foo',
          control: new FormArray([]),
        },
      ];

      const formValue: FormInterface = {
        foo: [1, 2, 3],
      };
      expect(arrayControls[0].control.controls.length).toBe(0);

      handleFormArrays<FormInterface>(arrayControls, formValue, () => new FormControl());

      expect(arrayControls[0].control.controls.length).toBe(3);
    });

    it('should preserve the disabled state of the array control when creating child array elements', () => {
      const arrayControls: { key: keyof FormInterface; control: FormArray }[] = [
        {
          key: 'foo',
          control: new FormArray([]),
        },
      ];

      arrayControls[0].control.disable();

      const formValue: FormInterface = {
        foo: [1, 2, 3],
      };
      expect(arrayControls[0].control.controls.length).toBe(0);

      handleFormArrays<FormInterface>(arrayControls, formValue, () => new FormControl());

      expect(arrayControls[0].control.disabled).toBe(true);
    });
  });
});
