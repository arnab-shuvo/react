import React from 'react';

export function provider<T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>>(
	provider: T,
	props?: Omit<React.ComponentProps<T>, 'children'>
) {
	return [ provider, props ];
}

export function ProviderComposer( { providers, children }: { providers: any[], children: React.ReactNode } ) {
	return providers.reduceRight( ( content, [ Provider, props ] ) => {
		return <Provider { ...props }>{ content }</Provider>;
	}, children );
}
