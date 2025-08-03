import * as React from 'react'
import { Input } from '@/components/ui/input'

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`)

const escapeRegExp = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export interface NumericalInputProps extends Omit<React.ComponentProps<typeof Input>, 'onChange' | 'value' | 'type'> {
    value: string | number | undefined
    onChange: (value: string) => void
}

const NumericalInput = React.forwardRef<React.ElementRef<typeof Input>, NumericalInputProps>(
    ({ className, value, onChange, placeholder = '0.0', ...props }, ref) => {
        const enforcer = (nextUserInput: string) => {
            if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
                onChange(nextUserInput)
            }
        }

        return (
            <Input
                ref={ref}
                className={className}
                value={value}
                onChange={(event) => {
                    enforcer(event.target.value.replace(/,/g, '.'))
                }}
                inputMode="decimal"
                autoComplete="off"
                autoCorrect="off"
                type="text"
                pattern="^[0-9]*[.,]?[0-9]*$"
                placeholder={placeholder}
                spellCheck="false"
                {...props}
            />
        )
    },
)

NumericalInput.displayName = 'NumericalInput'

export { NumericalInput }
