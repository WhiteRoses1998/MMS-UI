import { PreWork } from '@/features/prework/types';

interface Props {
  onSelect: (job: PreWork) => void;
}

export default function PreWorkTable({ onSelect }: Props) {
  return (
    <table>
      <tbody>
        <tr onClick={() => onSelect({ id: 'PW-001' } as PreWork)}>
          <td>PW-001</td>
        </tr>
      </tbody>
    </table>
  );
}
