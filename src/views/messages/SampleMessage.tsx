/** @jsxImportSource jsx-slack */
/** @jsxFrag JSXSlack.Fragment **/
import { Blocks, JSXSlack, Section } from 'jsx-slack';
import { View } from '../index';

export const SampleMessage = (userId: string): View => ({
  fallbackText: `Hello, <@${userId}>!`,
  blocks: JSXSlack(
    <Blocks>
      <Section>
        <p>
          Hello, <a href={`@${userId}`} />!
        </p>
      </Section>
    </Blocks>,
  ),
});
