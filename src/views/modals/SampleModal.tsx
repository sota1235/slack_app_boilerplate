/** @jsxImportSource jsx-slack */
/** @jsxFrag JSXSlack.Fragment **/
import {
  Divider,
  JSXSlack,
  Modal,
  Section,
  Select,
  Textarea,
  Option,
} from 'jsx-slack';
import { callbackIds } from '../../constants';
import { encodePrivateMetadata } from '../helper';

const actionId = 'sampleForm';

export const SampleModal = () =>
  JSXSlack(
    <Modal
      callbackId={callbackIds.sample}
      title="sample"
      privateMetadata={encodePrivateMetadata<{ sample: boolean }>({ sample: true })}
    >
      <Section>
        <p>
          Sample Modal Form
        </p>
      </Section>
      <Divider />
      <Textarea
        required
        label="Free text are"
        actionId={actionId}
        blockId="text"
      />
      <Select
        required
        label="Select fruit"
        actionId={actionId}
        blockId="fruit"
      >
        <Option value="orange">Orange</Option>
        <Option value="apple">Apple</Option>
        <Option value="grape">Grape</Option>
      </Select>
    </Modal>,
  );
